// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const storedCurrentPageOrDefault = ()=>{
    return localStorage.getItem("currentPage") ?? "start.html";
};
const promiseCache = {};
let currentPage = storedCurrentPageOrDefault();
const main = ()=>{
    const htmlMain = document.querySelector("main#main");
    const startPage = fetchPage(currentPage);
    switchToPage(htmlMain, startPage);
    bindAnchorTags(htmlMain);
    updateActiveNavLinks();
};
const anchorClicked = (htmlMain, e)=>{
    const url = e.target.href;
    const file = url.substring(url.lastIndexOf("/") + 1);
    e.preventDefault();
    if (promiseCache[file] !== undefined) {
        switchToPage(htmlMain, promiseCache[file]);
    } else {
        const promise = fetchPage(file);
        promiseCache[file] = promise;
        switchToPage(htmlMain, promise);
    }
    if (currentPage !== file) {
        currentPage = file;
        localStorage.setItem("currentPage", file);
        updateActiveNavLinks();
    }
};
const switchToPage = async (htmlMain, page)=>{
    htmlMain.innerHTML = await page;
    renderMathInElement(htmlMain, {
        delimiters: [
            {
                left: "$$",
                right: "$$",
                display: true
            },
            {
                left: "$",
                right: "$",
                display: false
            }, 
        ]
    });
};
const fetchPage = async (url)=>{
    const res = await fetch(url);
    return res.text();
};
const bindAnchorTags = (htmlMain)=>{
    document.querySelectorAll("[data-spa-anchor]").forEach((el)=>{
        el.addEventListener("click", (e)=>{
            anchorClicked(htmlMain, e);
        });
    });
};
const wipeActiveNavLinks = ()=>{
    document.querySelectorAll(`.nav-link.active[data-spa-anchor]`).forEach((el)=>el.classList.remove("active")
    );
};
const setActiveNavLinks = ()=>{
    document.querySelectorAll(`.nav-link[href="${currentPage}"][data-spa-anchor]`).forEach((el)=>el.classList.add("active")
    );
};
const updateActiveNavLinks = ()=>{
    wipeActiveNavLinks();
    setActiveNavLinks();
};
main();
