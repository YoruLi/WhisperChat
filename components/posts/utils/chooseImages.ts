export interface IChosenImages {
    url: string | ArrayBuffer | null;
    id: number;
    file: File;
}
export const chooseImages = async ({
    event,
    imageLen,
    updateChoosenImgs,
}: {
    event: React.ChangeEvent<HTMLInputElement>;
    imageLen: number;
    updateChoosenImgs: React.Dispatch<React.SetStateAction<IChosenImages[]>>;
}) => {
    const files: FileList | null = event?.target?.files;

    if (files) {
        if (files?.length + imageLen > 4) {
            return;
        }

        for (const file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result as string;
                updateChoosenImgs(prev => {
                    return [
                        ...prev,

                        {
                            url: reader.result,
                            id: Math.random(),
                            file: file,
                        },
                    ];
                });
            };
        }
    }
    event.target.value = "";
};
