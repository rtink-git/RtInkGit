class WListBox {
    constructor(id=null) {
        if(id != null) this.Id = (id.length > 0) ? id : this.constructor.name;
        this.UrlContent = `/Modules/${this.constructor.name}/content`; // Используем шаблонные строки
        this._LogBase = `Page component: ${this.constructor.name}. id: ${this.Id}`; // Шаблонные строки
        this._IsDebug = document.URL.includes("localhost"); // Присваиваем сразу
        if (this._IsDebug) console.log(`${this._LogBase} Ready to use`); // Логирование с шаблонной строкой
    }

    push(target, position = "afterend") {
        if(this._IsDebug) console.log(`${this._LogBase}.push()`);
        if (!(target instanceof HTMLElement)) target = document.getElementById(target);
        target.insertAdjacentHTML(position, this._html());
    }

    _html() {
        if (this._IsDebug) console.log(`${this._LogBase}._html()`);
        const idH = this.Id ? `id="${this.Id}"` : "";

        return `
<div ${idH} class="${this.constructor.name}">
    <ul>
    ${this._li("CountryForMoment.js", "Script allows you to get the country code of your current location", "https://github.com/rtink-git/CountryForMomentJs", "/Modules/WListBox/content/LinkedIn Banner 20241108.png")}
    ${this._li("Alga.wwwcore", "Nuget package extension to simplify development of ASP.NET Core applications", "https://www.nuget.org/packages/Alga.wwwcore", "/Modules/WListBox/content/LinkedIn Banner 20241104.png")}
    ${this._li("RT.Ink", "World news feed", "https://rt.ink/", "/Modules/WListBox/content/LinkedIn Banner 20241029.png")}
    </ul>
</div>`;
    }

    _li(title, description, url, src) {
        if (this._IsDebug) console.log(`${this._LogBase}._li()`);

        return `
<li>\
    <article>\
        <img src="${src}" />\
        <h1>\
            <a href=\"${url}\" target=\"_blank\">\
                ${title}
            </a>\
        </h1>\
        <p>\
            ${description}
        </p>\
        <footer>
        </footer>
    </article>\
</li>`;
    }
}