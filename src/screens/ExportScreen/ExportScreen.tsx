import { ButtonE } from "@components/ButtonE";
import { IconE } from "@components/IconE";
import { QRCodeE } from "@components/QRCode";
import { ScreenLayout } from "@components/ScreenLayout"
import { SwitchE } from "@components/SwitchE";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import { config } from "@config/config";
import { useEncryption } from "@hooks/useEncryption";
import { useNavigate } from "@hooks/useNavigate";
import { useSnackbar } from "@hooks/useSnackbar";
import { NavigationProps } from "@modules/Navigation";
import { OtpMigration } from "@modules/OtpMigration";
import { copyClipboard } from "@utils/copyClipboard";
import { useMemo, useState } from "react";

export const ExportScreen = (
  props: NavigationProps<'Export'>
) => {
  const { authenticatorExtendeds } = props.route.params;
  const totalPages = Math.ceil(authenticatorExtendeds.length / config.exportCountPerPage);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const encryption = useEncryption();
  const authenticatorsSlice = useMemo(() => {
    const result: AuthenticatorExtended[][] = []
    for (let i = 0; i < totalPages; i += 1) {
      result.push(authenticatorExtendeds.slice(i * config.exportCountPerPage, (i + 1) * config.exportCountPerPage));
    }
    return result;
  }, [authenticatorExtendeds]);
  const canPrevious = page > 0;
  const canNext = page < totalPages - 1;
  const exportUri = useMemo(() => {
    const result = [];
    const batchId = Math.floor(Math.random() * 65535);
    for (let i = 0; i < authenticatorsSlice.length; i += 1) {
      const slice = authenticatorsSlice[i];
      const authenticators: Authenticator[] = slice.map(record => ({
        secret: encryption.decrypt(record.encryptedSecret),
        ...record.authenticator,
      }));
      result.push(OtpMigration.encode({
        batchId,
        batchIndex: i,
        batchSize: totalPages,
        otpParameters: authenticators,
        version: 1,
      }));
    }
    return result;
  }, [authenticatorsSlice]);

  const onPreviousPage = () => {
    setPage(page - 1);
  }
  const onNextPage = () => {
    setPage(page + 1);
  }
  const onCopyToClipboard = () => {
    snackbar.dismiss();
    copyClipboard(exportUri[page]);
    snackbar.show('Copied to clipboard')
  }

  const onFinished = () => {
    navigate('Settings', {}, { popTo: true })
  }

  return <ScreenLayout headerText='Export'
    rightSection={<IconE icon='check' onPress={onFinished} />}
  >
    <ViewE gap='large' padding fullSize>
      <QRCodeE
        value={exportUri[page]}
      />
      <ButtonE icon='content-copy' onPress={onCopyToClipboard}>
        Copy to clipboard
      </ButtonE>
      <ViewE justifyContent="center" row alignItems="flex-end" flex={1}>
        <ViewE row justifyContent="center" alignItems="center">
          <IconE icon='chevron-left' onPress={onPreviousPage} disabled={!canPrevious} />
          <TextE>Page {page + 1} of {totalPages}</TextE>
          <IconE icon='chevron-right' onPress={onNextPage} disabled={!canNext} />
        </ViewE>
      </ViewE>
    </ViewE>
  </ScreenLayout>
} 