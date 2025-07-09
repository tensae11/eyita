import MultipleSelector, { Option } from "../ui/multiple-selector";

const MultipleSelectorDefault = ({
  onSelect,
  value,
  tags,
}: {
  onSelect: (options: Option[]) => void;
  value: Option[];
  tags: Option[];
}) => {
  return (
    <div className="w-full">
      <MultipleSelector
        defaultOptions={tags}
        placeholder="Movie Tags (you can create one to)...."
        onChange={onSelect}
        value={value}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorDefault;
