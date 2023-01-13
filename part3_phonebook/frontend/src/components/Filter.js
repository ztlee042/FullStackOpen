// from FullStackOpen example answer
const Filter = ({ value, handleFilter }) => {
    return <>
        Filter shown with
        <input
            value={value}
            onChange={handleFilter}
        />
    </>
}

export default Filter