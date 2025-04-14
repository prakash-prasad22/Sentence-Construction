/**
 * Dialog Component
 * ----------------
 * Displays a modal dialog (popup) allowing users to quit the quiz.
 *
 * Features:
 * -   Displays a dialog box with a semi-transparent backdrop.
 * -   Includes a title, content, and action buttons.
 * -   Provides "Cancel" and "Quit" buttons.
 * -   Handles user interaction with the buttons.
 * -   The dialog is centered on the screen.
 * -   The dialog is only displayed if the isOpen prop is true.
 *
 * Technical Details:
 * -   Uses a `div` element with `fixed` positioning to create the modal overlay.
 * -   Uses `backdrop-blur-sm` and `bg-opacity-50` to create the semi-transparent backdrop.
 * -   Uses `flex` and `justify-content` to center the dialog content.
 *
 * Props:
 * -   `isOpen`:   {boolean} -  Controls the visibility of the dialog.  If `true`, the dialog is displayed.
 * -   `onClose`:  {function} -  A callback function called when the "Cancel" button is clicked.
 * -   `onConfirm`: {function} - A callback function called when the "Quit" button is clicked.
 */

function Dialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-16 py-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Quit Quiz</h2>
        <p className="text-gray-500 text-[20px]">Are you sure you want to quit?</p>
        <p className="text-gray-500 text-[20px] mb-6">None of your answers will be saved</p>
        <div className="flex items-center justify-center">
          <button className="px-8 py-2 rounded bg-gray-300 hover:bg-gray-500 mr-2 cursor-pointer" onClick={onClose}>Cancel</button>
          <button className="px-8 py-2 rounded bg-red-400 hover:bg-red-600 text-white cursor-pointer" onClick={onConfirm}>Quit</button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;