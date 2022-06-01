

const main = () => {
    const htmlMain = document.querySelector<HTMLDivElement>('main#main')!;
    const startPage = fetchPage('start.html');
    const numeriskPage = fetchPage('numerisk.html');

    switchToPage(htmlMain, numeriskPage);
}

const switchToPage = async (htmlMain: HTMLDivElement, page: Promise<string>) => {
    htmlMain.innerHTML = await page;
}

const fetchPage = async (url: string): Promise<string> => {
    const res = await fetch(url);
    return res.text();
}

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
