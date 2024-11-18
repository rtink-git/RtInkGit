const isDebug = document.URL.includes("localhost")
if(isDebug) console.log("Is DEBUG")
else console.log("Is RELEASE")

// -- Initialization page components which can be used on the page

let headerBox = new HeaderBox("")
let bunnerBox = new BunnerBox("")
let categoriesHoriBox = new CategoriesHoriBox("")
let footerBox = new FooterBox("")
let wListBox = new WListBox("ProjectsWL")
let shelfWListBox = new WListBox("ShelfWL")

// --------------------

try {
    headerBox.initial_title("RT DEV")
    headerBox.push(document.getElementsByTagName("body")[0], "afterbegin");
    headerBox.push_menu_btn({ icon: headerBox.UrlContent + "/email-icon-64", alt: "email icon", url: "mailto:rtink.git@gmail.com" });

    let lastVerticalId = headerBox.Id

    document.getElementById(lastVerticalId).insertAdjacentHTML("afterend", "<main></main>")

    bunnerBox.push(document.getElementsByTagName("main")[0], "afterbegin");
    lastVerticalId = bunnerBox.Id

    categoriesHoriBox.push(lastVerticalId);
    lastVerticalId = categoriesHoriBox.Id

    let projectsL = [
        { title: "CountryForMoment.js", description: "Script allows you to get the country code of your current location", url: "https://github.com/rtink-git/CountryForMomentJs", img: "/Modules/WListBox/content/LinkedIn Banner 20241108.png" },
        { title: "Alga.wwwcore", description: "Nuget package extension to simplify development of ASP.NET Core applications", url: "https://www.nuget.org/packages/Alga.wwwcore", img: "/Modules/WListBox/content/LinkedIn Banner 20241104.png" },
        { title: "RT.Ink", description: "World news feed", url: "https://rt.ink", img: "/Modules/WListBox/content/LinkedIn Banner 20241029.png" }
    ]

    wListBox.push(document.querySelector("#" + categoriesHoriBox.Id + " > div > ul > li:first-child"), "beforeend", projectsL);

    let sheflL = [
        { title: "Test Cases for Software Testing", description: "How to Write Test Cases for Software Testing: A Complete Guide", url: "https://luxequality.com/blog/how-to-write-test-cases-for-software-testing/", img: "/Modules/WListBox/content/TestCaseExampleForWebApplication.webp" }
    ]

    shelfWListBox.push(document.querySelector("#" + categoriesHoriBox.Id + " > div > ul > li:nth-child(2)"), "beforeend", sheflL);

    footerBox.push(document.getElementsByTagName("main")[0], "afterend");
} catch (error) { }