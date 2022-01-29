import { UIButton } from "../../../../ui/uiPieces/UIButton";

export const DeleteFormButton = (props) => {
  return (
    <UIButton
      width="15rem"
      margin={8}
      icon={props.icon}
      label={props.label}
      isLoading={props.isLoading}
      onClick={props.action}
    />
  );
};
