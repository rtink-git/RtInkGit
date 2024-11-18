class WListBox {
    constructor(id=null) {
        if(id != null) this.Id = (id.length > 0) ? id : this.constructor.name;
        this.UrlContent = `/Modules/${this.constructor.name}/content`; // Используем шаблонные строки
        this._LogBase = `Page component: ${this.constructor.name}. id: ${this.Id}`; // Шаблонные строки
        this._IsDebug = document.URL.includes("localhost"); // Присваиваем сразу
        if (this._IsDebug) console.log(`${this._LogBase} Ready to use`); // Логирование с шаблонной строкой
    }

    push(target, position = "afterend", list) {
        if(this._IsDebug) console.log(`${this._LogBase}.push()`);
        if (!(target instanceof HTMLElement)) target = document.getElementById(target);
        target.insertAdjacentHTML(position, this._html(list));
    }

    _html(list) {
        if (this._IsDebug) console.log(`${this._LogBase}._html()`);
        const idH = this.Id ? `id="${this.Id}"` : "";

        let lis = ""
        list.forEach(m => {
            lis += this._li(m.title, m.description, m.url, m.img)
        })

        return `
<div ${idH} class="${this.constructor.name}">
    <ul>
    ${lis}
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