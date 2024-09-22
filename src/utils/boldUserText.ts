// Section 7.3: to highlight the search term in search suggestions

interface HighlightTextProps {
    length: number;
    offset: number;
    string: string;
  }
  
  // Function with typed parameter
  export const boldUserText = ({ length, offset, string }: HighlightTextProps): string => {
    if (length === 0 && offset === 0) {
      return string;
    }
  
    const userText = string.substring(offset, offset + length);
    const stringBefore = string.substring(0, offset);
    const stringAfter = string.substring(offset + length);
  
    return `${stringBefore}<b>${userText}</b>${stringAfter}`;
  };
  