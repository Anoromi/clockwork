export function conditionalStyles(
  ...values: [boolean, () => React.CSSProperties][]
) {
  let resultValues = {};

  for (let v of values) {
    if (v[0])
      resultValues = {
        ...resultValues,
        ...v[1](),
      };
  }
  return resultValues;
}
