class CategoriesHoriBox {
    // categories: ["Projects", "News", "Shelf"]
    constructor(id=null, categories) {
        this.Id = (id != null && id.length > 0) ? id : this.constructor.name;
        this.UrlContent = `/Modules/${this.constructor.name}/content`; // Используем шаблонные строки
        this._LogBase = `Page component: ${this.constructor.name}. id: ${this.Id}`; // Шаблонные строки
        this._IsDebug = document.URL.includes("localhost"); // Присваиваем сразу
        if (this._IsDebug) console.log(`${this._LogBase} Ready to use`); // Логирование с шаблонной строкой
        this.Categories = categories
    }

    push(target, position = "afterend") {
        if(this._IsDebug) console.log(`${this._LogBase}.push()`);
        if (!(target instanceof HTMLElement)) target = document.getElementById(target);
        target.insertAdjacentHTML(position, this._html());

        let trgt = document.querySelector("#" + this.Id + " > ul")

        // -----

        let lin = 0;
        let liact = 0;
        const attrname = "data-isActive"
        trgt.querySelectorAll("li").forEach(t => {
            lin ++;
            let attr = t.getAttribute(attrname)
            if(attr != null && attr == "true")
                liact = lin

            t.addEventListener('click', async (event) => {
                trgt.querySelectorAll("li").forEach(t => { t.setAttribute(attrname, "false"); })
                t.setAttribute(attrname,  "true")

                let linn = 0
                let liactt = 0
                trgt.querySelectorAll("li").forEach(t => {
                    linn ++;
                    let attr = t.getAttribute(attrname)
                    if(attr != null && attr == "true") liactt = linn
                });

                if(liactt > 0) {
                    document.querySelectorAll("#" + this.Id + " > div > ul > li").forEach(t => { t.style.display = "none" });
                    document.querySelector("#" + this.Id + " > div > ul > li:nth-child(" + liactt + ")").style.display = "block"
                }
            });
        })

        if(liact == 0) trgt.querySelector("li").setAttribute(attrname, "true")

        // -----
    }

    _html() {
        if (this._IsDebug) console.log(`${this._LogBase}._html()`);
        const idAttr = this.Id ? `id="${this.Id}"` : ""

        let category_lis_html = ""
        let body_lis_html = ""
        this.Categories.forEach(m => { 
            category_lis_html += this._category_li_html(m)
            body_lis_html += "<li></li>"
        });

        return `
<div ${idAttr} class="${this.constructor.name}">
    <ul>
        ${category_lis_html}
    </ul>
    <div>\
        <ul>\
            ${body_lis_html}
        </ul>\
    </div>\
</div>`;
    }

    _category_li_html(category) {
        let html = `
<li>\
    <a>\
        ${category}\
    </a>\
    <span>\
        /
    </span>\
</li>`
        return  html;
    }
}