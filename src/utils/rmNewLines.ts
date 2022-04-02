const rmNewlines = (str: string): string => str.replace(/(\r\n|\n|\r)/gm, '')

export default rmNewlines
