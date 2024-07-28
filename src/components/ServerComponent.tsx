
import { Field, RichText, Text } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props"

type ServerComponentParams = ComponentProps & {
    fields: {
        heading: Field<string>;
        content: Field<string>;
      };
}

const ServerComponent = ({fields}: ServerComponentParams) => {
    console.log("ServerComponent", fields);
    return(
        <div className="contentBlock">
            <Text tag="h2" className="contentTitle" field={fields.heading} />
            <RichText className="contentDescription" field={fields.content} />
        </div>
    )
}

export default ServerComponent;