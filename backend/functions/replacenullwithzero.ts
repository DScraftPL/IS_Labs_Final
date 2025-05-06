const replaceNullWithZero = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === null) {
      obj[key] = 0;
    }
  }
  return obj;
}

export default replaceNullWithZero;