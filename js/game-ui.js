/**
 * Toggles the visibility of instructions and manages related event listeners
 */
function toggleInstruction() {
    const instructionTemplate = document.getElementById('instruction-template');
    instructionTemplate.classList.toggle('d-none');
    
    clearActiveFocus();
    handleInstructionVisibilityChange(instructionTemplate);
}

/**
 * Clears active element focus
 */
function clearActiveFocus() {
    if (document.activeElement) {
        document.activeElement.blur();
    }
}

/**
 * Handles changes to instruction visibility
 * @param {HTMLElement} instructionTemplate - The instruction element
 */
function handleInstructionVisibilityChange(instructionTemplate) {
    if (!instructionTemplate.classList.contains('d-none')) {
        setTimeout(() => {
            document.addEventListener('click', closeInstructionOnClickOutside);
            document.addEventListener('touchend', closeInstructionOnClickOutside);
        }, 10);
    } else {
        document.removeEventListener('click', closeInstructionOnClickOutside);
        document.removeEventListener('touchend', closeInstructionOnClickOutside);
    }
}

/**
 * Closes the instruction panel when clicked outside
 * @param {Event} event - The click or touch event
 */
function closeInstructionOnClickOutside(event) {
    const instructionTemplate = document.getElementById('instruction-template');
    const instructionButton = document.getElementById('instruction-info');
    const instructionStartBtn = document.getElementById('instruction-start-btn');
    
    if (!instructionTemplate.contains(event.target) && 
        event.target !== instructionButton && 
        event.target !== instructionStartBtn) {
        instructionTemplate.classList.add('d-none');
        document.removeEventListener('click', closeInstructionOnClickOutside);
        document.removeEventListener('touchend', closeInstructionOnClickOutside);
    }
}