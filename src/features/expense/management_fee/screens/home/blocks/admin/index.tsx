import { ScrollView } from "react-native";
import ScreenTopFilter from "./blocks/top_filter";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function AdminMFView() {
    const { deviceUI, theme } = useStyler();
    return (
        <ScrollView>
            <ScreenTopFilter
                style={{
                    backgroundColor: theme.color.series.grey.level1,
                    //borderTopColor: "",
                    borderBottomColor: theme.color.series.grey.level2,
                }}
                filterStyle={{
                    selectedBorderColor: theme.color.specified.black,
                    selectedBackgroundColor: theme.color.specified.white,
                    backgroundColor: theme.color.series.grey.level1,
                }}
                data={[
                    {
                        name: "성빈",
                        age: 1,
                        job: "농부",
                    },
                    {
                        name: "준우",
                        age: 2,
                        job: "어부",
                    },
                    {
                        name: "태성",
                        age: 3,
                        job: "광부",
                    },
                ]}
                filters={[
                    {
                        name: "층",
                        headers: ["1", "2", "3"],
                        postfix: "층",
                        filter: (datum: testt, selectedHeaders: string[]) => {
                            console.log(datum, selectedHeaders);
                            return true;
                        },
                        enableSelectAll: true,
                    },
                    {
                        name: "계약",
                        headers: ["미등록", "전세", "월세"],
                        filter: (datum: testt, selectedHeaders: string[]) => {
                            console.log(datum, selectedHeaders);
                            return true;
                        },
                        enableSelectAll: true,
                    },
                    {
                        name: "상태",
                        headers: ["가입", "미가입", "공실"],
                        filter: (datum: testt, selectedHeaders: string[]) => {
                            console.log(datum, selectedHeaders);
                            return true;
                        },
                        enableSelectAll: true,
                    },
                    {
                        name: "만료",
                        headers: ["만료", "만료 임박"],
                        filter: (datum: testt, selectedHeaders: string[]) => {
                            console.log(datum, selectedHeaders);
                            return true;
                        },
                        enableSelectAll: true,
                    },
                ]}
            />
        </ScrollView>
    );
}

type testt = {
    name: string;
    age: number;
    job: string;
};

/* 

1. 베이스 데이터
2. 필터 이름
3. 전체 선택 여부
4. 필터

<BaseFilter data={foos} onChangeData={}>
    <Filter 
        name="층"
        filter=["1", "2", "3"]
        postFix="층"
        enableSelectAll
    />
</BaseFilter>

 */
