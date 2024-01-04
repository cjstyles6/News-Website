const apiKey = "78fb7577a2614153a5d3eac4bacf3d13";

const buttons = ['general', 'business', 'entertainment', 'health', 'science', 'technology'];

const buttonContainer = document.getElementById('btn-container');
buttons.forEach(category => {
    const button = document.createElement('button');
    button.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    button.classList.add('bg-red-600', 'px-2', 'py-1', 'rounded-md', 'text-white', 'mr-2', 'mb-2', 'block');
    button.addEventListener('click', (e) => searchNews(category));
    buttonContainer.appendChild(button);
});
async function searchNews(category) {
    const search = document.getElementById("search").value;
    const baseurl = 'https://newsapi.org/v2/everything';
    const url = `${baseurl}?q=${search}&apiKey=${apiKey}`;
    const categoryUrl = `https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=${apiKey}`;

    try {
        let resp;
        let data;

        if (search.length > 0) {
            resp = await fetch(url);
            data = await resp.json();
          
        } else {
            resp = await fetch(categoryUrl);
            data = await resp.json();
           
        }

        const content = document.getElementById("content");
        content.innerHTML = "";

        data.sources.forEach((article) => {
            const { author, name, description, url, urlToImage } = article;

            const result = document.createElement("div");
            result.classList.add("result");
            result.innerHTML = `
                <div id="text-container">
                    <h1>${name}</h1>
                    <p>${description}</p>
                    <a href="${url}" target="_blank">Read More</a>
                </div>
            `;

            if (urlToImage === null) {
                const defaultImage = document.createElement("img");
                defaultImage.classList.add("default");
                defaultImage.src = "no-image.png";
                result.insertBefore(defaultImage, result.firstChild);
            } else {
                const image = document.createElement("img");
                image.src = urlToImage;
                result.insertBefore(image, result.firstChild);
            }

            content.appendChild(result);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

document.getElementById("search-btn").addEventListener("click", searchNews);


