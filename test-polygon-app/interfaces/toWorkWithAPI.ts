export interface Tag {
    id: string;
    name: string;
    color: string;
    permanent: boolean;
}

export interface Item {
    heroIds?: string[];
    sceneIds?: string[];
    episodeIds?: string[];
    seasonIds?: string[];
    branchIds?: string[];

    fileIds?: string[];
    foldersIds?: string[];
    musics?: string[];

    id: string;
    tags: Tag[];
}

export interface File extends Item {
    name: string;
    body: string;
}

export interface Folder extends Item {
    name: string;
}

export interface Profile extends Item {
    name: string;
    img: string;
    shortDescription: string;
}

export interface Hero extends Item {
    profile: Profile;
    name: string;
    img: string;
    description: string;
}

export interface Branch extends Item {
    profile: Profile;
    name: string;
    img: string;
}

export interface TextItem {
    type: string;
}

export interface Replica extends TextItem {
    hero: string;
    text: string;
}

export interface Description extends TextItem {
    text: string;
}

export interface Header extends TextItem {
    text: string;
}

export type TextBlockType = Replica | Description | Header;

export interface TextBlock {
    id: string;
    sceneId: string;
    type: TextBlockType;
    tags: Tag[];
}

export interface Scene extends Item {
    profile: Profile;
    name: string;
    img: string;
    descruption: string;
    body: TextBlock[];

    x: number;
    y: number;
}

export interface Episode extends Item {
    profile: Profile;
    name: string;
    img: string;
    descruption: string;

    start: number;
    end: number;
}

export interface Season extends Item {
    profile: Profile;
    name: string;
    img: string;
    descruption: string;

    start: number;
    end: number;
}