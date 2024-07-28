import { ComponentPropsContext, EditingComponentPlaceholder, RenderingType, SitecoreContext } from "@sitecore-jss/sitecore-jss-nextjs";
import { handleEditorFastRefresh } from "@sitecore-jss/sitecore-jss-nextjs/utils";
import { SitecorePageProps } from "lib/page-props";
import { sitecorePagePropsFactory } from "lib/page-props-factory";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Layout from "src/Layout";
import NotFound from "src/NotFound";
import { componentBuilder } from "temp/componentBuilder";


const SitecorePage = ({ notFound, componentProps, layoutData, headLinks }: SitecorePageProps) => {
    console.log("Inside LiveData => SitecorePage", layoutData);
    useEffect(() => {
        handleEditorFastRefresh();
    }, [])

    if(notFound || !layoutData?.sitecore?.route){
        return <NotFound></NotFound>
    }

    const isEditing = layoutData.sitecore.context.pageEditing;
    const isComponentRendering = layoutData.sitecore.context.renderingType === RenderingType.Component;

    return (
        <ComponentPropsContext value={componentProps}>
            <SitecoreContext 
            componentFactory={componentBuilder.getComponentFactory({ isEditing })}
            layoutData={layoutData}>
                {isComponentRendering ? (
                    <EditingComponentPlaceholder rendering={layoutData?.sitecore?.route} />
                    ) : (
                    <Layout layoutData={layoutData} headLinks={headLinks} />
                    )}
            </SitecoreContext>
        </ComponentPropsContext>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log("Inside server side props: LiveData");
    if (context.params) context.params.path = context.resolvedUrl;
    const props = await sitecorePagePropsFactory.create(context);
    return {
        props,
        notFound: props.notFound
    }
}

export default SitecorePage;
