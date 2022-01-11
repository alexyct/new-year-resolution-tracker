import React, { useEffect } from "react";

import AddMemo from "components/AddMemo/AddMemo";

const Index = (props) => {
  useEffect(() => {});

  return (
    <div>
      <AddMemo
        week={null}
        startDate={null}
        endDate={null}
        saveMemoClickedHandler={null}
      />
    </div>
  );
};

export default Index;
