const ModalInteraction = {
    NEW_CHANNEL: "new_channel",
    NEW_SHOW: "new_show",
    NEW_ACTOR: "new_actor",
    NEW_CATEGORY: "new_category",
    EDIT_CHANNEL: "edit_channel",
    EDIT_SHOW: "edit_show"
    // TODO: továbbiak..
}

function displayModal(interaction) {
    const dashboardModal = document.getElementById('dashboard-modal');
    dashboardModal.style.display = "block";
    const modalContent = document.getElementById('modal-content');
    switch(interaction) {
        case ModalInteraction.NEW_CHANNEL:
            const categories = []; // TODO: fetch

            const title = document.createElement('span');
            title.id = 'modal-title';
            title.textContent = 'Új csatorna létrehozása';
            modalContent.appendChild(title);

            const form = document.createElement('form');
            form.id = 'new-channel-form';

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Csatorna neve';
            nameInput.required = true;
            form.appendChild(nameInput);

            const descriptionInput = document.createElement('input');
            descriptionInput.type = 'text';
            descriptionInput.placeholder = 'Csatorna leírása';
            descriptionInput.required = true;
            form.appendChild(descriptionInput);

            if (categories.length > 0) {
                const label = document.createElement('label');
                label.htmlFor = 'categories';
                label.textContent = 'Kategória hozzárendelése:';
                form.appendChild(label);

                const select = document.createElement('select');
                select.name = 'categories';
                select.id = 'categories';

                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = `category-${category.id}`;
                    option.textContent = category.name;
                    select.appendChild(option);
                });

                form.appendChild(select);
            } else {
                const noCategoriesMessage = document.createElement('span');
                noCategoriesMessage.id = 'no-categories';
                noCategoriesMessage.textContent = 'Kategória hozzárendeléséhez hozz létre először egy kategóriát!';
                form.appendChild(noCategoriesMessage);
            }

            const interactions = document.createElement('div');
            interactions.className = 'interaction-container';

            const submitButton = document.createElement('button');
            submitButton.id = 'submit-btn';
            submitButton.type = 'submit';
            submitButton.className = 'modal-btn submit';
            submitButton.textContent = 'Csatorna létrehozása';
            interactions.appendChild(submitButton);

            const cancelButton = document.createElement('button');
            cancelButton.id = 'cancel-btn';
            cancelButton.type = 'button';
            cancelButton.className = 'modal-btn cancel';
            cancelButton.textContent = 'Vissza';
            cancelButton.onclick = hideModal;
            interactions.appendChild(cancelButton);
            modalContent.appendChild(form);
            modalContent.appendChild(interactions);
            break;
        case ModalInteraction.NEW_SHOW:

            break;
        case ModalInteraction.NEW_ACTOR:
            break;
        case ModalInteraction.NEW_CATEGORY:
            break;
    }
}

function hideModal() {
    const dashboardModal = document.getElementById('dashboard-modal');
    dashboardModal.style.display = "none";
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
}

window.onclick = function(event) {
    const dashboardModal = document.getElementById('dashboard-modal');
    if (event.target === dashboardModal) {
        hideModal();
    }
}