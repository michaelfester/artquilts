# Set the Google Analytics tracking ID, if you want GA tracking on the pages
GA_TRACKING_CODE=${GOOGLE_ANALYTICS_TRACKING_ID_PERSONAL}

# If you want to upload to an Amazon S3 bucket, set the URL here
AMAZON_S3_URL=${AMAZON_S3_QUILTS_BUCKET}

# Replace with local directory. The structure is expeted to be
# as follows:
#
# Artworks/
#   Cezanne/
#     wikipaintings/
#       1860 - Landscape with Mill - 23x31cm - Oil on canvas.jpg
#       ...
#   Degas/
#       ...
#
LOCAL_ARTWORKS_DIR=${ARTWORKS_DIR}

upload:
	grunt filter --gaTrackingCode=${GA_TRACKING_CODE}
	aws s3 sync --delete build ${AMAZON_S3_URL}

init:
	rm -fr data/$(ARTIST_ID)
	mkdir -p data/$(ARTIST_ID)
	rm -fr build/img/$(ARTIST_ID)

grunt:
	grunt --gaTrackingCode=${GA_TRACKING_CODE}

generate:
	grunt image_resize:artist --artistId=$(ARTIST_ID)
	grunt copy:data --artistId=$(ARTIST_ID)
	grunt --gaTrackingCode=${GA_TRACKING_CODE}

wikipaintings:
	$(MAKE) init ARTIST_ID=$(ARTIST_ID)
	cp ${LOCAL_ARTWORKS_DIR}/$(ARTIST_ID)/wikipaintings/*.* data/$(ARTIST_ID)
	$(MAKE) generate ARTIST_ID=$(ARTIST_ID)

# Example rule
picasso:
	$(MAKE) wikipaintings ARTIST_ID=picasso