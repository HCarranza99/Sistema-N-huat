/**
 * Ítem de opción única — stack vertical de botones.
 * Si la opción seleccionada tiene `allow_custom`, aparece un input para texto libre.
 *
 * answer = { valueText: option.value, valueOther?: customText } o null
 */
export default function SingleChoiceItem({ item, answer, onChange }) {
  const selectedValue = answer?.valueText ?? null
  const otherText = answer?.valueOther ?? ''

  const selectedOption = item.options.find((o) => o.value === selectedValue) ?? null
  const needsCustom = selectedOption?.allow_custom === true

  const handleSelect = (option) => {
    onChange({
      valueNumeric: null,
      valueText: option.value,
      valueOther: option.allow_custom ? otherText : null,
    })
  }

  const handleCustomChange = (e) => {
    onChange({
      valueNumeric: null,
      valueText: selectedValue,
      valueOther: e.target.value,
    })
  }

  return (
    <div className="sc-wrap">
      <div className="sc-options">
        {item.options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`sc-btn ${selectedValue === option.value ? 'sc-selected' : ''}`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {needsCustom && (
        <input
          type="text"
          className="profile-input sc-custom-input"
          placeholder="Especifica cuál…"
          value={otherText}
          onChange={handleCustomChange}
          aria-label="Especificar otra opción"
        />
      )}
    </div>
  )
}
