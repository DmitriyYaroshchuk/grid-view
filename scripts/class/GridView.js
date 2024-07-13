class GridView {
    constructor() {
        this._title = '';
        this._titleClass = [];
        this._tableClass = [];
        this._element = 'body';
        this.attributes = {};
        this.data = [];
    }

    setTitle(title) {
        if (typeof title === 'string' && title.trim() !== '') {
            this._title = title.trim();
        }
    }

    setTitleClass(titleClass) {
        if (Array.isArray(titleClass)) {
            this._titleClass = titleClass;
            return true;
        }
        return false;
    }

    setTableClass(tableClass) {
        if (Array.isArray(tableClass)) {
            this._tableClass = tableClass;
            return true;
        }
        return false;
    }

    setElement(element) {
        if (document.querySelector(element)) {
            this._element = element;
            return true;
        }
        return false;

    }

    setAttributes(attributes) {
        this.attributes = attributes;
    }

    setData(data) {
        this.data = data;
    }

    createTitle() {
        if (this._title !== '') {
            const title = document.createElement("h1");
            title.textContent = this._title;
            this._titleClass.forEach(cssClass => {
                title.classList.add(cssClass);
            });
            document.querySelector(this._element).append(title);
        }
    }

    createTable() {
        if (this._tableClass.length === 0) return;
        const table = document.createElement("table");
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass);
        });
        return table;
    }

    createTableHeaderRow() {
        const tHead = document.createElement("thead");
        const tr = document.createElement("tr");
        for (let key in this.attributes) {
            const th = document.createElement("th");
            if (this.attributes[key].label) {
                th.textContent = this.attributes[key].label;
            } else {
                th.textContent = key;
            }
            tr.append(th);
        }
        tHead.append(tr);
        return tHead;
    }

    createTableRow(dataArr) {
        const tr = document.createElement("tr");
        for (let key in this.attributes) {
            const td = document.createElement("td");
            let value = dataArr[key];

            // есть ли функция в value
            if (this.attributes[key].value) {
                value = this.attributes[key].value(dataArr);
            }

            //есть ли атрибут src
            if (this.attributes[key].src) {
                td.innerHTML = value;
            } else {
                td.textContent = value;
            }

            tr.append(td);
        }
        return tr;
    }


    render(data) {
        this.setTitle(data.title);
        this.setTitleClass(data.titleClass);
        this.setTableClass(data.tableClass);
        this.setElement(data.element);
        this.setAttributes(data.attributes);
        this.setData(data.data);

        // show Title
        this.createTitle();

        // show Table
        const table = this.createTable();

        //show Header-Table
        const headerRow = this.createTableHeaderRow();
        table.append(headerRow);

        //draw Table
        const tBody = document.createElement("tbody");
        this.data.forEach(dataArr => {
            const rowTable = this.createTableRow(dataArr);
            tBody.append(rowTable);
        });

        table.append(tBody);
        document.querySelector(this._element).append(table);
    }

}