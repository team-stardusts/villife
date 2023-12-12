import { useEffect, useState } from "react";
import CodePush, { DownloadProgress } from "react-native-code-push";

export default function useCodePush() {
    const [isUpdating, setIsUpdating] = useState<boolean>(true);
    const [syncProgress, setSyncProgress] = useState<DownloadProgress | null>(null);

    useEffect(() => {
        const checkAndGetCodePush = async () => {
            try {
                const update = await CodePush.checkForUpdate();
                // 필수(mandatory) 업데이트가 존재하는 경우 업데이트 프로세스 실행
                if (update && update?.isMandatory) {
                    update
                        .download((progress) => setSyncProgress(progress))
                        .then((newPackage) =>
                            newPackage.install(CodePush.InstallMode.IMMEDIATE).then(() => {
                                CodePush.restartApp();
                            })
                        );
                    return;
                }
                // 필수(mandatory) 업데이트가 존재하지 않는 경우 isUpdating 상태 false로 변경
                setIsUpdating(false);
                return;
            } catch (err) {
                setIsUpdating(false);
            }
        };

        checkAndGetCodePush();
    }, []);

    return [isUpdating, syncProgress];
}
