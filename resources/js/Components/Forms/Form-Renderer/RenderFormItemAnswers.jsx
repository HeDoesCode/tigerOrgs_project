import FormResponseDisplay from "./FormResponseDisplay";

function RenderFormItemAnswers({ item, orgID, applicationID }) {
    return (
        <FormResponseDisplay
            item={item}
            orgID={orgID}
            applicationID={applicationID}
        />
    );
}

export default RenderFormItemAnswers;
