
declare type SystemDetails = {
    [key: string]: string,
};

export declare function getSystemDetail(): Promise<SystemDetails>;
export declare function getBattery(): Promise<number>;
