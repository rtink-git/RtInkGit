const isDebug = document.URL.includes("localhost")
if(isDebug) console.log("Is DEBUG")
else console.log("Is RELEASE")

// -- Initialization page components which can be used on the page

let headerBox = new HeaderBox("")
let bunnerBox = new BunnerBox("")
let categoriesHoriBox = new CategoriesHoriBox("", ["Projects", "News", "Shelf"])
let footerBox = new FooterBox("")
let wListBox = new WListBox("ProjectsWL")
let newsWListBox = new WListBox("NewsWL")
let shelfWListBox = new WListBox("ShelfWL")

// --------------------

try {
    headerBox.initial_title("RT Git")
    headerBox.push(document.getElementsByTagName("body")[0], "afterbegin");
    headerBox.push_menu_btn({ icon: headerBox.UrlContent + "/email-icon-64", alt: "email icon", url: "mailto:rtink.git@gmail.com" });

    let lastVerticalId = headerBox.Id

    document.getElementById(lastVerticalId).insertAdjacentHTML("afterend", "<main></main>")

    bunnerBox.push(document.getElementsByTagName("main")[0], "afterbegin");
    lastVerticalId = bunnerBox.Id

    categoriesHoriBox.push(lastVerticalId);
    lastVerticalId = categoriesHoriBox.Id

    let projectsL = [
        { title: "Alga.search", description: "Nuget package. Tools for searching among words and strings, which I use in my projects", url: "https://www.nuget.org/packages/Alga.search", img: "/UISs/Index/content/alga-search-banner.png" },
        { title: "Alga.xaml", description: "Nuget package. My XAML/XML parser implementation, which I use in my projects", url: "https://www.nuget.org/packages/Alga.xaml", img: "/UISs/Index/content/alga-xaml-banner.png" },
        { title: "Alga.telegram", description: "Nuget package. My implementation of the library for working with Telegram Api-s, which I use in my projects", url: "https://www.nuget.org/packages/Alga.telegram", img: "/UISs/Index/content/LinkedIn Banner 20241119.png" },
        { title: "CountryForMoment.js", description: "Script allows you to get the country code of your current location", url: "https://github.com/rtink-git/CountryForMomentJs", img: "/Modules/WListBox/content/LinkedIn Banner 20241108.png" },
        { title: "Alga.wwwcore", description: "Nuget package extension to simplify development of ASP.NET Core applications", url: "https://www.nuget.org/packages/Alga.wwwcore", img: "/UISs/Index/content/alga-wwwcore-banner.png" },
        { title: "RT.Ink", description: "World news feed", url: "https://rt.ink", img: "/Modules/WListBox/content/LinkedIn Banner 20241029.png" }
    ]

    wListBox.push(document.querySelector("#" + categoriesHoriBox.Id + " > div > ul > li:first-child"), "beforeend", projectsL);

    let newsL = [
        { title: "Alga.telegram", description: "New version of the Nuget package updated to version .Net 9", url: "https://www.nuget.org/packages/Alga.telegram/2.0.0", img: "/UISs/Index/content/LinkedIn Banner 20241119.png" },
        { title: "Alga.wwwcore - version 3.0.0", description: "The new version has been updated to .Net 9", url: "https://www.nuget.org/packages/Alga.wwwcore/3.0.0", img: "/UISs/Index/content/alga-wwwcore-banner.png" },
        { title: "Alga.wwwcore - version 2.1.0", description: "The new version adds a logging system with hints and error information.", url: "https://www.nuget.org/packages/Alga.wwwcore/2.1.0", img: "/UISs/Index/content/alga-wwwcore-banner.png" }
    ]

    newsWListBox.push(document.querySelector("#" + categoriesHoriBox.Id + " > div > ul > li:nth-child(2)"), "beforeend", newsL);

    let sheflL = [
        { title: "What's New in .NET 9 with Examples", description: ".NET 9 introduced many features, so in this video, I will walk you through every .NET 9 feature worth knowing and give you practical examples to understand how each feature works and how you can use it in your codebase.", url: "https://youtu.be/PvB5jtA-QfM?si=LYa6UkzfcgV-Ghpp", img: "/UISs/Index/content/whats-new-in-NET-9.jpg" },
        { title: "Test Cases for Software Testing", description: "How to Write Test Cases for Software Testing: A Complete Guide", url: "https://luxequality.com/blog/how-to-write-test-cases-for-software-testing/", img: "/Modules/WListBox/content/TestCaseExampleForWebApplication.webp" }
    ]

    shelfWListBox.push(document.querySelector("#" + categoriesHoriBox.Id + " > div > ul > li:nth-child(3)"), "beforeend", sheflL);

    footerBox.push(document.getElementsByTagName("main")[0], "afterend");
} catch (error) { }