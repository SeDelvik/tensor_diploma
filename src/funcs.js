/** 
 * Получение одной картинки из сети
*/
export async function getPic() {
    let imgUrl = 'https://picsum.photos/200';
    let image;
    try {
        let img = await fetch(imgUrl);
        if (img.status === 200) {
            image = img.url;
        } else {
            throw new Error('Fetch image error ' + img.status);
        }
    } catch (err) {
        console.log(err);
    }

    return image;
}
/**
 * Получение json по переданному url 
 * @param url ссылка
 * @returns json c данными
*/
export async function getJson(url) {
    let json = {};
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            json = await response.json();
        } else {
            throw new Error(url + ' error ' + response.status);
        }
    } catch (err) {
        console.log(err);
    }
    return json;
}