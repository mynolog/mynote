export const generateId = (): string => {
  // 소문자 a-z
  const lowerCase: string[] = []
  for (let i = 0; i < 26; i++) {
    lowerCase.push(String.fromCharCode(97 + i))
  }

  // 대문자 A-Z
  const upperCase: string[] = []
  for (let i = 0; i < 26; i++) {
    upperCase.push(String.fromCharCode(65 + i))
  }

  // 숫자 0-9
  const digest: string[] = []
  for (let i = 0; i < 10; i++) {
    digest.push(i.toString())
  }

  const characters = [...lowerCase, ...upperCase, ...digest].join('')
  let id = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters[randomIndex]
  }
  return id
}
