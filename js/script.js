document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('characterForm');
    const saveBtn = document.getElementById('saveBtn');
    const startBtn = document.getElementById('startBtn');
    
    // Display elements
    const displayName = document.getElementById('displayName');
    const displayGender = document.getElementById('displayGender');
    const displayAge = document.getElementById('displayAge');
    const displayProf = document.getElementById('displayProf');
    
    // Save button click handler
    saveBtn.addEventListener('click', function() {
        if (form.checkValidity()) {
            updateCharacterDisplay();
            alert('ДАННЫЕ СОХРАНЕНЫ!');
        } else {
            alert('ПОЖАЛУЙСТА, ЗАПОЛНИТЕ ВСЕ ОБЯЗАТЕЛЬНЫЕ ПОЛЯ!');
        }
    });
    
    // Start button click handler - теперь перенаправляет на game.html
    startBtn.addEventListener('click', function() {
        if (form.checkValidity()) {
            saveCharacterData();
            window.location.href = 'game.html';
        } else {
            alert('ПОЖАЛУЙСТА, СОХРАНИТЕ ПЕРСОНАЖА ПЕРЕД НАЧАЛОМ!');
        }
    });
    
    // Update character display
    function updateCharacterDisplay() {
        displayName.textContent = document.getElementById('name').value || '-';
        
        const genderSelect = document.getElementById('gender');
        displayGender.textContent = genderSelect.options[genderSelect.selectedIndex].text;
        
        displayAge.textContent = document.getElementById('age').value || '-';
        
        const profSelect = document.getElementById('profession');
        displayProf.textContent = profSelect.options[profSelect.selectedIndex].text;
    }
    
    // Save character data to localStorage
    function saveCharacterData() {
        const character = {
            name: document.getElementById('name').value,
            gender: document.getElementById('gender').value,
            age: document.getElementById('age').value,
            profession: document.getElementById('profession').value,
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            education: document.getElementById('education').value,
            coin: "10000"
        };
        localStorage.setItem('ruslexCharacter', JSON.stringify(character));
    }
    
    // Initialize form with default values
    document.getElementById('age').value = '20';
    document.getElementById('height').value = '180';
    document.getElementById('weight').value = '70';
    updateCharacterDisplay();
});