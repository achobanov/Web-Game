interface typeMap { // for mapping from strings to types
    string: string;
    number: number;
    boolean: boolean;
}
  
type PrimitiveOrConstructor = 
    | { new (...args: any[]): any }
    | keyof typeMap;

// infer the guarded type from a specific case of PrimitiveOrConstructor
type GuardedType<T extends PrimitiveOrConstructor> = T extends { new(...args: any[]): infer U; }
    ? U 
    : T extends keyof typeMap 
        ? typeMap[T] 
        : never;

function isOfType<T extends PrimitiveOrConstructor>(o: any, className: T) : o is GuardedType<T> {
    const localPrimitiveOrConstructor: PrimitiveOrConstructor = className;
    
    if (typeof localPrimitiveOrConstructor === 'string') {
        return typeof o === localPrimitiveOrConstructor;
    }

    return o instanceof localPrimitiveOrConstructor;
}

export default {
    uId: () => Math.random().toString(36).substr(2, 9),
    isOfType: isOfType,
}