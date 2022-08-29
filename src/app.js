var crudApp = new function () {

	// An array of JSON objects with values.
	this.sites = [
		{ site: 'Computer Architecture', isActive: true },
		{ site: 'Asp.Net 4 Blue Book', isActive: true },
		{ site: 'Popular Science', isActive: false }
	]

	this.columns = ['site', 'isActive'];
	this.columnNames = ['Site', 'Active'];

	this.refresh = function () {
		this.createTable();
		this.subscribeToEvents();
	};

	this.createTable = function () {

		// CREATE A TABLE.
		var table = document.createElement('table');
		table.setAttribute('id', 'sitesTable');     // Set table id.

		var tr = table.insertRow(-1);
		tr.innerHTML = `<th>Site</th>
		                <th>Active</th>`;

		// Add rows using JSON data.
		for (var i = 0; i < this.sites.length; i++) {
			tr = table.insertRow(-1);
			tr.innerHTML = `<td>${this.sites[i].site}</td>
			                <td>
								<input type="checkbox" class="active" id="active${i}" ${this.sites[i].isActive ? "checked" : ""}>
							</td>
							<td>
								<label style="display:none;" title="Cancel" id="Cancel${i}">âœ–</label>
								<input type="button" value="Save" id="Save${i}" style="display:none;">
								<input type="button" value="Update" id="Edit${i}" style="background-color:#44CCEB;">
								<input type="button" value="Delete" id="Delete${i}" style="background-color:#ED5650;">
							</td>
							<th>
							</th>`
		}

		tr = table.insertRow(-1);
		tr.innerHTML = `<td>
							<input type="text" id="NewSiteText" value="">
						</td>
						<td></td>						
						<td>
							<input type="button" value="Create" id="New" style="background-color:#207DD1;">
						</td>`		

		var div = document.getElementById('container');
		div.innerHTML = '';
		div.appendChild(table);
	};

	this.subscribeToEvents = function () {
		for (var i = 0; i < this.sites.length; i++) {
			document.getElementById('Cancel' + i).addEventListener("click", function () { crudApp.Cancel(this) })
			document.getElementById('Save' + i).addEventListener("click", function () { crudApp.Save(this) })
			document.getElementById('Edit' + i).addEventListener("click", function () { crudApp.Update(this) })
			document.getElementById('Delete' + i).addEventListener("click", function () { crudApp.Delete(this) })
		}

		document.getElementById('New').addEventListener("click", function () { crudApp.CreateNew(this) })
	};

	// ****** OPERATIONS START.

	// CANCEL.
	this.Cancel = function (oButton) {

		// HIDE THIS BUTTON.
		oButton.setAttribute('style', 'display:none; float:none;');

		var activeRow = oButton.parentNode.parentNode.rowIndex;

		// HIDE THE SAVE BUTTON.
		var btSave = document.getElementById('Save' + (activeRow - 1));
		btSave.setAttribute('style', 'display:none;');

		// SHOW THE UPDATE BUTTON AGAIN.
		var btUpdate = document.getElementById('Edit' + (activeRow - 1));
		btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

		var tab = document.getElementById('sitesTable').rows[activeRow];

		for (i = 0; i < this.columns.length; i++) {
			var td = tab.getElementsByTagName("td")[i];
			td.innerHTML = this.sites[(activeRow - 1)][this.columns[i]];
		}
	}


	// EDIT DATA.
	this.Update = function (oButton) {
		var activeRow = oButton.parentNode.parentNode.rowIndex;
		var tab = document.getElementById('sitesTable').rows[activeRow];

		// SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
		for (i = 0; i < 1; i++) {

			var td = tab.getElementsByTagName("td")[i];
			var ele = document.createElement('input');      // TEXTBOX.
			ele.setAttribute('type', 'text');
			ele.setAttribute('value', td.innerText);
			td.innerText = '';
			td.appendChild(ele);
		}

		var lblCancel = document.getElementById('lbl' + (activeRow - 1));
		lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

		var btSave = document.getElementById('Save' + (activeRow - 1));
		btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

		// HIDE THIS BUTTON.
		oButton.setAttribute('style', 'display:none;');
	};


	// DELETE DATA.
	this.Delete = function (oButton) {
		var activeRow = oButton.parentNode.parentNode.rowIndex;
		this.sites.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
		this.refresh();                         // REFRESH THE TABLE.
	};

	// SAVE DATA.
	this.Save = function (oButton) {
		var activeRow = oButton.parentNode.parentNode.rowIndex;
		var tab = document.getElementById('sitesTable').rows[activeRow];

		// UPDATE myBooks ARRAY WITH VALUES.
		for (i = 1; i < this.columns.length; i++) {
			var td = tab.getElementsByTagName("td")[i];
			if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
				this.sites[(activeRow - 1)][this.columns[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
			}
		}
		this.refresh();     // REFRESH THE TABLE.
	}

	// CREATE NEW.
	this.CreateNew = function (oButton) {
		var edit = document.getElementById('NewSiteText');
		var txtVal = edit.value;

		var obj = {};

		if (txtVal != '') {
			obj.site = txtVal.trim();
		}
		else {
			obj = '';
			alert('all fields are compulsory');
		}

		if (Object.keys(obj).length > 0) {      // CHECK IF OBJECT IS NOT EMPTY.
			this.sites.push(obj);             // PUSH (ADD) DATA TO THE JSON ARRAY.
			this.refresh();                 // REFRESH THE TABLE.
		}
	}

	// ****** OPERATIONS END.
}

crudApp.refresh();