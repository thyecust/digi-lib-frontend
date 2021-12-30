import { Button } from "@mui/material";

const ClickEvent = (setter, value) => {
    return (e) => setter(value);
};

const ClickButton = ({ text, setter, value }) => {
    return (
        <Button
            sx={{ float: "right" }}
            size="small"
            variant="outlined"
            onClick={ClickEvent(setter, value)}
        >
            {text}
        </Button>
    );
};

const GobackButton = ({ setter, value }) => {
    return ClickButton({ text: "返回", setter: setter, value: value });
};

export { GobackButton, ClickEvent, ClickButton };
