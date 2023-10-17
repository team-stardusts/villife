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
                        floor: 1,
                        state: "가입",
                    },
                    {
                        name: "준우",
                        floor: 2,
                        state: "미가입",
                    },
                    {
                        name: "태성",
                        floor: 3,
                        state: "공실",
                    },
                ]}
                onFilterData={(d) => console.log("Hello", d)}
                filters={[
                    {
                        name: "층",
                        conditions: ["1", "2", "3"],
                        postfix: "층",
                        enableSelectAll: true,
                        filter: (datum: testt, selectedConditions: string[]) => {
                            return selectedConditions.find((condition) => condition === datum.floor.toString())
                                ? true
                                : false;
                        },
                    },
                    {
                        name: "계약",
                        conditions: ["미등록", "전세", "월세"],
                        enableSelectAll: true,
                        filter: (datum: testt, selectedConditions: string[]) => {
                            return true;
                        },
                    },
                    {
                        name: "상태",
                        conditions: ["가입", "미가입", "공실"],
                        enableSelectAll: true,
                        filter: (datum: testt, selectedConditions: string[]) => {
                            return selectedConditions.find((condition) => condition === datum.state) ? true : false;
                        },
                    },
                    {
                        name: "만료",
                        conditions: ["만료", "만료 임박"],
                        enableSelectAll: true,
                        filter: (datum: testt, selectedConditions: string[]) => {
                            return true;
                        },
                    },
                ]}
            />
        </ScrollView>
    );
}

type testt = {
    name: string;
    floor: number;
    state: string;
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
