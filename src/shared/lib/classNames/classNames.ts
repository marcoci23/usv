export type Mods = Record<string, boolean | string | undefined>

export function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
    return [  
        cls,
        ...Object.entries(mods)
            .filter(([key,value]) => Boolean(value) )
            .map(([key,value]) => key),
        ...additional.filter(Boolean)
    ].join(' ')
}