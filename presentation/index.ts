const storedCurrentPageOrDefault = (): string => {
    return localStorage.getItem("currentPage") ?? "start.html";
};

const promiseCache: { [url: string]: Promise<string> | undefined } = {};
let currentPage: string = storedCurrentPageOrDefault();

const main = () => {
    const htmlMain = document.querySelector<HTMLDivElement>("main#main")!;
    const startPage = fetchPage(currentPage);
    switchToPage(htmlMain, startPage);
    bindAnchorTags(htmlMain);
    updateActiveNavLinks();
};

const anchorClicked = (htmlMain: HTMLDivElement, e: MouseEvent) => {
    const url = (e.target as HTMLAnchorElement).href;
    const file = url.substring(url.lastIndexOf("/") + 1);

    e.preventDefault();
    if (file !== currentPage) {
    }
    if (promiseCache[file] !== undefined) {
        switchToPage(htmlMain, promiseCache[file]!);
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

const switchToPage = async (
    htmlMain: HTMLDivElement,
    page: Promise<string>
) => {
    htmlMain.innerHTML = await page;
    // @ts-ignore
    renderMathInElement(htmlMain);
};

const fetchPage = async (url: string): Promise<string> => {
    const res = await fetch(url);
    return res.text();
};

const bindAnchorTags = (htmlMain: HTMLDivElement) => {
    document
        .querySelectorAll<HTMLAnchorElement>("[data-spa-anchor]")
        .forEach((el) => {
            el.addEventListener("click", (e: Event) => {
                anchorClicked(htmlMain, e as MouseEvent);
            });
        });
};

const wipeActiveNavLinks = () => {
    document
        .querySelectorAll<HTMLAnchorElement>(
            `.nav-link.active[data-spa-anchor]`
        )
        .forEach((el) => el.classList.remove("active"));
};

const setActiveNavLinks = () => {
    document
        .querySelectorAll<HTMLAnchorElement>(
            `.nav-link[href="${currentPage}"][data-spa-anchor]`
        )
        .forEach((el) => el.classList.add("active"));
};

const updateActiveNavLinks = () => {
    wipeActiveNavLinks();
    setActiveNavLinks();
};

const loadingPage = () => /*html*/ `
    <div class="px-4 py-5 text-center">
        <img class="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"
            alt="" width="72" height="57" />
        <span class="placeholder col-3 placeholder-lg"></span>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
                <span class="placeholder col-11 placeholder-sm"></span>
                <span class="placeholder col-3  placeholder-sm"></span>
            </p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <span class="placeholder col-1 placeholder-lg"></span>
            </div>
        </div>
    </div>

    <div class="container text-center" style="max-width: 700px;">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"
            role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#868e96"></rect>
        </svg>
    </div>
`;

main();
