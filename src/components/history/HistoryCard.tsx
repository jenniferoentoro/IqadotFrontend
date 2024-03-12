import { Button, Chip, Grid, Paper, Stack, Switch } from "@mui/material";
import {useState} from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {publishArticle} from "../../services/UNorPublishArticles/PublishArticles.ts";
import {unpublishArticles} from "../../services/UNorPublishArticles/UnpublishArticles.ts";
import {publishStatic} from "../../services/UNorPublishArticles/PublishStatic.ts";
import {unpublishStatic} from "../../services/UNorPublishArticles/UnpublishStatic.ts";
import { deleteArticle } from "../../services/deleteArticles/deleteArticle.ts";
import { deleteStatic } from "../../services/deleteArticles/deleteStatic.ts";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "fullWidth",
  padding: theme.spacing(2),
  borderRadius: "10px",
  marginBottom: 10,
}));

interface HistoryCardProps {
  title: string;
  name: string;
  type: string;
  date: string;
  mode: string;
  publish: boolean;
  isDeleted: boolean;
  id: string;
  onDelete(mode: string): void
}

const HistoryCard = (props: HistoryCardProps) => {
  const [isPublished, setIsPublished] = useState(props.publish);
  const [isDeleted, setIsDeleted] = useState(props.isDeleted);

  const handlePublishToggle = async () => {
    try {
      if (isPublished) {
        if (props.mode === "articles") {
          await unpublishArticles(props.id);
        } else if (props.mode === "static") {
          await unpublishStatic(props.id);
        }
      } else {
        if (props.mode === "articles") {
          await publishArticle(props.id);
        } else if (props.mode === "static") {
          await publishStatic(props.id);
        }
      }
      setIsPublished(!isPublished);
    } catch (error) {
      console.error("Error updating publication status:", error);
    }
  };

  let content = <></>;
  if (props.type === "PDF") {
    content = <Chip label={props.type} color={"error"} />;
  } else if (props.type === "CSV") {
    content = <Chip label={props.type} color={"warning"} />;
  } else if (props.type === "JSON") {
    content = <Chip label={props.type} color={"success"} />;
  }

  let details = <></>;
  if (props.mode === "articles") {
    if (props.mode === "articles" && props.type === "PDF") {
      details = (
          <a href={`http://localhost/pdf/${props.name}`}>
            <Button>Download</Button>
          </a>
      );
    } else if (props.mode === "articles" && props.type === "CSV") {
      details = (
          <a href={`http://localhost/csv/${props.name}`}>
            <Button>Download</Button>
          </a>
      );
    } else if (props.mode === "articles" && props.type === "JSON") {
      details = <a href={props.name}>{props.name}</a>;
    }
  } else if (props.mode === "static" && props.type === "CSV") {
    details = (
        <a href={`http://localhost/static/csv/${props.name}`}>
          <Button>Download</Button>
        </a>
    );
  }

  
  const handleDelete = async () => {
    try{
      if (!props.isDeleted){
        if (props.mode === "articles") {
          await deleteArticle(props.id);
        } else if (props.mode === "static") {
          await deleteStatic(props.id);
        }   
        props.onDelete(props.mode)
      }
    }catch(error){
      console.log("Error deleting article", error)
    }
  }
  
  let isDeletedContent = <></>
   
    if(!props.isDeleted){
    isDeletedContent = <Button variant={"contained"} color="error" onClick={handleDelete} disabled={props.publish}>Delete</Button>
    }else{
      isDeletedContent = <Typography variant={"subtitle1"} m={3} color={"error"}>Deleted</Typography>
    }
    
  const publicationStatus = props.publish ? "Published" : "Unpublished";

  return (
      <>
        <DemoPaper>
          <Grid container justifyContent={"space-between"} alignItems={"center"}>
            <Grid item>
              <Grid container spacing={1} alignItems={"center"}>
                <Grid item>{content}</Grid>
                <Grid item>
                  <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
                    {props.title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant={"subtitle2"}>{props.date}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ height: 10 }} />
          <Grid container justifyContent={"space-between"} alignItems={"center"}>
            <Grid item>
              {/*<Typography variant={"subtitle2"} color="#555555">*/}
              {/*  {props.name} - {isPublished ? "Published" : "Unpublished"}*/}
              {/*</Typography>*/}
              <Stack direction={"row"} alignItems={"center"}>
                <Switch
                    checked={isPublished}
                    onChange={handlePublishToggle}
                    inputProps={{ "aria-label": "controlled" }}
                    disabled={props.isDeleted}
                />
                <Typography variant={"subtitle1"}>{isPublished ? "Published" : "Unpublished"}</Typography>
              </Stack>
              {details}
            </Grid>
            <Grid item>
             {isDeletedContent}
            </Grid>
          </Grid>
        </DemoPaper>
      </>
  );
};

export default HistoryCard;
