
class Helper {

  public static camelToSnakeCase (text: string): string
  {
    return text.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  public static camelToPhrase (text: string): string
  {
    return text.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
  }
}
