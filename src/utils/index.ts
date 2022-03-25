const b64 = (str: string): string => {
  return Buffer.from(str).toString('base64')
}

export { b64 }
