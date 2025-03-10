declare module '*.scss' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
  }

  declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    // const content: any;
    export default content;
  }

  declare const __IS_DEV__ : boolean
  declare const __API__ : string

declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
}