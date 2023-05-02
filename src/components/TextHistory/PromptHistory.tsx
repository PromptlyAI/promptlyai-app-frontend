import React, { useContext } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { AppContext } from "../../context/AppContext";
import Api from "../../api/Api";

interface promptHistoryProps {
  input: string;
  path?: string;
  pressed: boolean;
  id: string;
  icon?: string;
  loading: boolean;
  type: string;
}

interface IProps {
  promptHistory: promptHistoryProps[];
  setPromptHistory: React.Dispatch<React.SetStateAction<promptHistoryProps[]>>;
  promptHistoryLoading: boolean;
}

export default function PromptHistory({
  promptHistory,
  setPromptHistory,
  promptHistoryLoading,
}: IProps) {
  const { setPromptId, screenDimensions } = useContext(AppContext);

  function pressHistoryBtn(_id: string) {
    let arr = [...promptHistory];
    arr.map((btn) =>
      btn.id === _id ? (btn.pressed = true) : (btn.pressed = false)
    );
    setPromptHistory(arr);

    //set prompt id --> load prompt
    setPromptId(_id);

    //deselect all mode buttons
    // let modeButtons = [...modes];
    // modeButtons.map((btn) => (btn.pressed = false));
    // setModes(modeButtons);
  }

  async function deletePrompt(_id: string) {
    const arr = [...promptHistory];
    arr.map((btn) =>
      btn.id === _id ? (btn.loading = true) : (btn.loading = false)
    );
    const response = await Api({
      path: "prompt",
      method: "DELETE",
      token: localStorage.getItem("token") as string,
      bodyParams: {
        promptId: _id,
      },
    });
    console.log(await response);

    const newArr = arr.filter((btn) => btn.id !== _id);
    setPromptHistory(newArr);
  }

  return (
    <div className="prompt-history-container">
      {!promptHistoryLoading ? (
        <>
          {promptHistory.map((historyBtn) => (
            <StyledButton
              key={historyBtn.id}
              click={() => {
                pressHistoryBtn(historyBtn.id);
              }}
              deleteIconClick={() => {
                deletePrompt(historyBtn.id);
              }}
              pressed={historyBtn.pressed}
              btnWidth={screenDimensions.w < 1200 ? 200 : 355}
              btnHeight={56}
              btnStyle={2}
              textColor="white"
              title={
                historyBtn.input
                  ? historyBtn.input.length > 20
                    ? `${historyBtn.input.slice(0, 20)}...`
                    : historyBtn.input
                  : "[untitled]"
              }
              bookIcon={true}
              imgIcon={historyBtn.type === "IMAGE" ? true : false}
              trashIcon={!historyBtn.loading}
              animationPopup={true}
              loading={historyBtn.loading}
            />
          ))}
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "15%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
