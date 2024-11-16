const isDebug = document.URL.includes("localhost")
if(isDebug) console.log("Is DEBUG")
else console.log("Is RELEASE")

// -- Initialization page components which can be used on the page

let headerBox = new HeaderBox("")
let bunnerBox = new BunnerBox("")
let footerBox = new FooterBox("")
let wListBox = new WListBox("")

// --------------------

try {
    headerBox.initial_title("RT DEV")
    headerBox.push(document.getElementsByTagName("body")[0], "afterbegin");
    headerBox.push_menu_btn({ icon: headerBox.UrlContent + "/email-icon-64", alt: "email icon", url: "mailto:rtink.git@gmail.com" });

    let lastVerticalId = headerBox.Id

    document.getElementById(lastVerticalId).insertAdjacentHTML("afterend", "<main></main>")

    bunnerBox.push(document.getElementsByTagName("main")[0], "afterbegin");
    lastVerticalId = bunnerBox.Id

    wListBox.push(lastVerticalId);

    footerBox.push(document.getElementsByTagName("main")[0], "afterend");
} catch (error) { }