import { Button, Menu } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface MenuComponentProps {
  title: string;
  availableFilters: string[];
  setState: (state: string) => void;
  state: string;
  Icon: any;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  title,
  availableFilters,
  setState,
  state,
  Icon,
}) => {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button className="text-gray-400 p-0 hover:text-white bg-inherit hover:bg-inherit">
          <Icon className="w-7 h-7" />
        </Button>
      </Menu.Target>
      <Menu.Dropdown className="overflow-scroll max-h-64">
        <Menu.Label>{title}</Menu.Label>
        {availableFilters.map((item) => (
          <Menu.Item
            onClick={() => setState(item)}
            key={item}
            className="capitalize"
          >
            <div className="flex justify-between items-center">
              {item}
              {item === state && <IconCheck className="w-5 h-5" />}
            </div>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuComponent;
