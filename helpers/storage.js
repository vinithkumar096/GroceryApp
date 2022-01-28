import * as FileSystem from "expo-file-system";


const base_uri = FileSystem.documentDirectory + "data/"

export async function ensureDirExists(dirUri = base_uri) {
    const dirInfo = await FileSystem.getInfoAsync(dirUri);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
    }
}

export async function getFileInfo(fileName){
    ensureDirExists(base_uri)
    return FileSystem.getInfoAsync(base_uri + fileName)
}

export async function readFile(fileName){
    ensureDirExists(base_uri)
    const uri = base_uri + fileName
    const fileInfo = await FileSystem.getInfoAsync(uri)
    if (!fileInfo.exists) {
        console.log("File does not exist!")
        return Promise.reject("File does not exist!").catch(console.log)
    }
    if (fileInfo.isDirectory) {
        console.log("Should not be a directory! Only files allowed")
        return Promise.reject("Should not be a directory! Only files allowed").catch(console.log)
    }
    return new Promise((resolve, reject) => {
        FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.UTF8})
        .then(data => {
            resolve(JSON.parse(data))
        }).catch(e => {
            reject(e)
        })
    })
}

export async function writeFile(fileName, data){
    ensureDirExists(base_uri)
    const uri = base_uri + fileName
    return FileSystem.writeAsStringAsync(uri, JSON.stringify(data), { encoding: FileSystem.EncodingType.UTF8 })
        .catch(console.log)
}

export async function deleteFile(fileName){
    return FileSystem.deleteAsync(base_uri + fileName).catch(console.log)
}