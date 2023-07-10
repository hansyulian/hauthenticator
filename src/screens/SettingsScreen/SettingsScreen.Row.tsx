import { DividerE } from "@components/DividerE"
import { ViewE, ViewEProps } from "@components/ViewE"

export type SettingsScreenRowProps = ViewEProps & {

}

export const SettingsScreenRow = (props: SettingsScreenRowProps) => {
  return <ViewE>
    <ViewE padding {...props}>
      {props.children}
    </ViewE>
    <DividerE />
  </ViewE>
}
