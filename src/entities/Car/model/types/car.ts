export enum CarBlockType {
    SPECIFICATIONS = 'SPECIFICATIONS',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT'
}

export interface CarBlockBase {
    id: string,
    type: CarBlockType
}

export interface CarSpecBlock extends CarBlockBase {
    type: CarBlockType.SPECIFICATIONS
    specifications: string
}

export interface CarTextBlock extends CarBlockBase {
    type: CarBlockType.TEXT
    text: string
    paragraphs: string
    title?: string
}

export interface CarImgBlock extends CarBlockBase {
    type: CarBlockType.IMAGE
    src: string
    title: string
}

export type CarBlock = CarSpecBlock | CarTextBlock | CarImgBlock

export enum CarType {
    ALL = 'ALL',
    BUSINESS = 'BUSINESS',
    SPORT = 'SPORT',
    ECONOM = 'ECONOM'
}

export interface Car {
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: CarType
    blocks: CarBlock[]
}

export enum ViewMode {
    TILES = "TILES",
    LIST = "LIST"
}

export enum CarSortField {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED_AT = 'createdAt'
}