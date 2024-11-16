class FooterBox {
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
        const idAttr = this.Id ? `id="${this.Id}"` : "";

        return `
<div ${idAttr} class="${this.constructor.name}">
    <div>
        <ul>\
            <li>\
                <a href=\"https://ru.linkedin.com/in/airat-galimov?trk=people-guest_people_search-card\" target=\"_blank\">\
                    <span>\
                        LinkedIn
                    </span>\
                </a>\
            </li>\
            <li>\
                <a href=\"https://www.nuget.org/profiles/rtink-git\" target=\"_blank\">\
                    <span>\
                        NuGet
                    </span>\
                </a>\
            </li>\
            <li>\
                <a href=\"https://github.com/rtink-git\" target=\"_blank\">\
                    <span>\
                        GitHub
                    </span>\
                </a>\
            </li>\
        </ul>\
    </div>
</div>`;
    }
}