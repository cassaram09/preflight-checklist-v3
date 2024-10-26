type StyleObject = {[key: string]: string};
type StyleInput = string | boolean | (string | boolean | undefined)[];

// returns a function that allows us to get the class name from the styles object via the string name
export const classes = (styles: StyleObject): ((name: StyleInput) => string) => {
  return (name) => {
    if (typeof name === 'string') {
      return styles[name] || name || '';
    }

    if (Array.isArray(name)) {
      return name.map((n: any) => styles[n || ''] || n || '').join(' ');
    }

    return '';
  };
};
