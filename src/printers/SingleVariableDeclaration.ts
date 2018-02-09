import * as bt from 'babel-types';
import Context, {SingleVariableDeclaration} from '../Context';
import print from './';

export default function printSingleVariableDeclaration(
  node: SingleVariableDeclaration,
  ctx: Context,
): string {
  const id = node.declaration.id;
  if (!bt.isIdentifier(id)) {
    throw ctx.getError(
      'Expected id of variable to be an Identifier',
      node.declaration,
    );
  }
  if (id.typeAnnotation) {
    return `declare ${node.kind} ${id.name}: ${print(id.typeAnnotation, ctx)};`;
  }
  if (!node.declaration.init) {
    throw ctx.getError(
      'This variable gets exported, so it must have a type annotation or an init.',
      node.declaration,
    );
  }
  if (
    bt.isCallExpression(node.declaration.init) &&
    bt.isIdentifier(node.declaration.init.callee, {name: 'curry'})
  ) {
    const args = node.declaration.init.arguments;
    const arg = args[0];
    if (!args.length || !bt.isIdentifier(arg)) {
      throw ctx.getError(
        'The special curry function is only supported with a single argument.',
        node.declaration.init,
      );
    }
    const declarations = ctx.declarations.get(arg.name);
    if (!declarations || !declarations.some(d => bt.isFunctionDeclaration(d))) {
      throw ctx.getError(
        'Could not find a function declaration named ' + arg.name + '.',
        arg,
      );
    }
    return declarations
      .map(d => {
        if (!bt.isFunctionDeclaration(d)) {
          return '';
        }
        const name = id.name;
        const params = d.params;
        let updatedFunction = {...d, id: {...id}};
        const output = [];
        for (
          let numberPassedAlready = params.length - 1;
          numberPassedAlready >= 0;
          numberPassedAlready--
        ) {
          for (
            let extraArgsPassed = 1;
            extraArgsPassed <= params.length - numberPassedAlready;
            extraArgsPassed++
          ) {
            updatedFunction.id.name =
              name +
              (numberPassedAlready === 0 ? '' : 'With' + numberPassedAlready);
            ctx.output.printed.add(updatedFunction.id.name);
            updatedFunction.params = params.slice(
              numberPassedAlready,
              numberPassedAlready + extraArgsPassed,
            );
            updatedFunction.returnType =
              numberPassedAlready + extraArgsPassed < params.length
                ? bt.typeAnnotation(
                    bt.typeofTypeAnnotation({
                      ...id,
                      name:
                        id.name +
                        'With' +
                        (numberPassedAlready + extraArgsPassed),
                    } as any),
                  )
                : d.returnType;

            output.push(print(updatedFunction, ctx));
          }
        }
        return output.join('\n');
      })
      .join('\n');
  }
  const type = print(node.declaration.init, ctx);
  return `declare ${node.kind} ${id.name}: ${type};`;
}
